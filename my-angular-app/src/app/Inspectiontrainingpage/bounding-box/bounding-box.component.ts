import { Component, Input, Output, EventEmitter, OnInit, ElementRef, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import interact from 'interactjs';

// Define the annotation structure
interface Annotation {
  bounding_box: number[];
  class_name: string;
  score: number;
  id?: string;
}

// Define the annotations structure
interface Annotations {
  [category: string]: Annotation[];
}

@Component({
  selector: 'app-bounding-box',
  templateUrl: './bounding-box.component.html',
  styleUrls: ['./bounding-box.component.css'],
  imports: [CommonModule]
})
export class BoundingBoxComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() imageUrl!: string;
  @Input() annotation!: Annotations; 
  @Output() annotationsUpdated = new EventEmitter<Annotations>(); // Emit updated annotations
  @Output() imageUrlUpdated = new EventEmitter<string>(); // Emit updated image URL
  annotations!: Annotations;
  @ViewChild('imageContainer') imageContainer!: ElementRef;
  objectKeys = Object.keys; // Add this line
  
  private hoveredBoundingBox: HTMLElement | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(`${environment.GetImagesAndAnnotationsApiUrl}/Api/GetImagesAndAnnotations/${this.imageUrl}`, {
      responseType: 'blob' 
    }).subscribe({
      next: (blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.imageUrl = objectURL;
        this.annotations = this.annotation;
      },
      error: (error) => {
        console.error('Error fetching image:', error);
      }
    });

    console.log(this.annotation);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['annotation']?.currentValue) {
      this.annotations = changes['annotation'].currentValue;
    }
  }

  ngAfterViewInit(): void {
    this.makeDraggable();
    this.setupDeleteBoundingBox();
  }

  makeDraggable(): void {
    this.makeBoundingBoxesDraggable();
    this.makeBoundingBoxesResizable();
  }

  private makeBoundingBoxesDraggable(): void {
    interact('.bounding-box')
      .draggable({
        listeners: {
          move: this.handleDragMove.bind(this),
          end: this.emitUpdatedAnnotations.bind(this)
        },
        inertia: true
      });

    document.querySelectorAll('.bounding-box').forEach(box => {
      box.addEventListener('mouseenter', (event) => {
        this.hoveredBoundingBox = event.currentTarget as HTMLElement;
      });
      box.addEventListener('mouseleave', () => {
        this.hoveredBoundingBox = null;
      });
    });
  }

  private handleDragMove(event: any): void {
    const target = event.target;
    let x = parseFloat(target.getAttribute('data-x')) || 0;
    let y = parseFloat(target.getAttribute('data-y')) || 0;

    x += event.dx;
    y += event.dy;

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    target.setAttribute('data-x', x.toString());
    target.setAttribute('data-y', y.toString());

    this.updateAnnotation(target, x, y);
  }

  private makeBoundingBoxesResizable(): void {
    interact('.bounding-box')
      .resizable({
        edges: { left: true, right: true, top: true, bottom: true },
        listeners: {
          move: this.handleResizeMove.bind(this),
          end: this.emitUpdatedAnnotations.bind(this)
        }
      });
  }

  private handleResizeMove(event: any): void {
    const target = event.target;
    const { width, height } = event.rect;

    target.style.width = `${width}px`;
    target.style.height = `${height}px`;

    this.updateAnnotation(target, undefined, undefined, width, height);
  }

  private updateAnnotation(target: HTMLElement, x?: number, y?: number, width?: number, height?: number): void {
    const annotationId = target.getAttribute('data-id');

    Object.keys(this.annotations).forEach(category => {
      this.annotations[category] = this.annotations[category].map(annotation => {
        if (annotation.id === annotationId) {
          const [x1, y1, x2, y2] = annotation.bounding_box;

          return {
            ...annotation,
            bounding_box: [
              x !== undefined ? x : x1,
              y !== undefined ? y : y1,
              x !== undefined ? x + (width || x2 - x1) : x2,
              y !== undefined ? y + (height || y2 - y1) : y2
            ]
          };
        }
        return annotation;
      });
    });
  }

  private emitUpdatedAnnotations(): void {
    this.annotationsUpdated.emit(this.annotations);
  }

  private setupDeleteBoundingBox(): void {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Delete' && this.hoveredBoundingBox) {
        this.deleteBoundingBox(this.hoveredBoundingBox);
      }
    });
  }

  private deleteBoundingBox(target: HTMLElement): void {
    const annotationId = target.getAttribute('data-id');
  
    this.annotations = Object.keys(this.annotations).reduce((result, category) => {
      result[category] = this.annotations[category].filter(annotation => annotation.id !== annotationId);
      return result;
    }, {} as Annotations);
  
    target.remove();
    interact('.bounding-box').unset();
    this.emitUpdatedAnnotations();
  }
}
