import { Component, Input, Output, EventEmitter, OnInit, ElementRef, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SessionStorageService } from '../../storage.service';
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

interface Data {
  image: string;
  annotations: Annotations | null;
  id?: string;
}


@Component({
  selector: 'app-bounding-box',
  templateUrl: './bounding-box.component.html',
  styleUrls: ['./bounding-box.component.css'],
  imports: [CommonModule]
})
export class BoundingBoxComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() data!: Data;
  @Output() annotationsUpdated = new EventEmitter<Annotations>();
  @Output() imageUrlUpdated = new EventEmitter<string>();
  annotations!: Annotations;
  inspectionData: any = null;
  @ViewChild('imageContainer') imageContainer!: ElementRef;
  imageUrl!: string;

  private hoveredBoundingBox: HTMLElement | null = null;

  constructor(private http: HttpClient, private sessionStorageService: SessionStorageService) {}

  objectKeys(obj: object | null | undefined): string[] {
    return obj && typeof obj === 'object' ? Object.keys(obj) : [];
  }

  ngOnInit(): void {
    this.http.get(`${environment.GetImagesAndAnnotationsApiUrl}/Api/GetImagesAndAnnotations/${this.data.image}`, {
      responseType: 'blob' 
    }).subscribe({
      next: (blob) => {

        const objectURL = URL.createObjectURL(blob);
        this.imageUrl = objectURL;
        if(this.data.annotations)
        {
          this.annotations = this.data.annotations;
        }
  
      },
      error: (error) => {
        console.error('Error fetching image:', error);
      }
    });
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
    if (!annotationId) {
        console.warn("Annotation ID is missing!");
        return;
    }


    this.inspectionData = this.sessionStorageService.getItem('inspectionData');

    if (this.inspectionData && Array.isArray(this.inspectionData)) {
      this.inspectionData.forEach((item: any) => {
        if (!item || !item.annotations || typeof item.annotations !== 'object') return;
    
        Object.keys(item.annotations || {}).forEach(category => {
          const annotationsArray = item.annotations?.[category];
          if (!Array.isArray(annotationsArray)) return;
    
          item.annotations[category] = annotationsArray.map((annotation: any) => {
            if (!annotation || !annotation.bounding_box || !Array.isArray(annotation.bounding_box)) return annotation;
    
            if (annotation.id === annotationId) {
              annotation.bounding_box[0] = x ?? annotation.bounding_box[0];
              annotation.bounding_box[1] = y ?? annotation.bounding_box[1];
              annotation.bounding_box[2] = width ?? annotation.bounding_box[2];
              annotation.bounding_box[3] = height ?? annotation.bounding_box[3];
            }
    
            return annotation;
          });
        });
      });

      this.sessionStorageService.setItem('inspectionData', this.inspectionData);
  }
  
        

    
}


  private emitUpdatedAnnotations(updatedAnnotations: any): void {
    sessionStorage.setItem('annotations', JSON.stringify(updatedAnnotations.annotations));
    sessionStorage.setItem('imageUrl', updatedAnnotations.image);

    this.annotationsUpdated.emit(updatedAnnotations.annotations);
  }

  private setupDeleteBoundingBox(): void {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Delete' && this.hoveredBoundingBox) {
        console.log("Hello");
        this.deleteBoundingBox(this.hoveredBoundingBox);
      }
    });
  }

  private deleteBoundingBox(target: HTMLElement): void {
    const annotationId = target.getAttribute('data-id');

    if (!annotationId) return;

    this.annotations = Object.keys(this.annotations).reduce((result, category) => {
      result[category] = this.annotations[category].filter(annotation => annotation.id !== annotationId);
      return result;
    }, {} as Annotations);

    target.remove();

    interact('.bounding-box').unset();

    this.emitUpdatedAnnotations({ annotations: this.annotations, image: this.data.image });

  }
}
