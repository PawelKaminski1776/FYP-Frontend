import { Component, Input, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import interact from 'interactjs';

@Component({
  selector: 'app-bounding-box',
  templateUrl: './bounding-box.component.html',
  styleUrls: ['./bounding-box.component.css'],
  imports: [CommonModule]
})

export class BoundingBoxComponent implements OnInit, AfterViewInit {
  @Input() imageUrl!: string;
  @Input() annotations!: any[];
  @ViewChild('imageContainer') imageContainer!: ElementRef;
  
  private hoveredBoundingBox: HTMLElement | null = null;

  ngOnInit(): void {
    console.log(this.annotations);
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
          start: this.handleDragStart,
          move: this.handleDragMove,
          end: this.handleDragEnd
        },
        inertia: true, 
        onstart(event) {
          event.target.style.pointerEvents = 'auto'; 
        }
      });

    // Track the hovered bounding box
    document.querySelectorAll('.bounding-box').forEach(box => {
      box.addEventListener('mouseenter', (event) => {
        this.hoveredBoundingBox = event.currentTarget as HTMLElement;
      });
      box.addEventListener('mouseleave', () => {
        this.hoveredBoundingBox = null;
      });
    });
  }

  private handleDragStart(event: any): void {
    const target = event.target;
    const rect = target.getBoundingClientRect();
    
    const container = target.closest('.image-container');
    const containerRect = container.getBoundingClientRect();
  
    const offsetX = rect.left - containerRect.left;
    const offsetY = rect.top - containerRect.top;
  
    target.setAttribute('data-x', offsetX.toString());
    target.setAttribute('data-y', offsetY.toString());
  }

  private handleDragMove(event: any): void {
    const target = event.target;
    let x = parseFloat(target.getAttribute('data-x')) || 0;
    let y = parseFloat(target.getAttribute('data-y')) || 0;

    const container = target.closest('.image-container');
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    x += event.dx;
    y += event.dy;

    if (x < 0) {
      x = 0;
    } else if (x + targetRect.width > containerRect.width) {
      x = containerRect.width - targetRect.width;
    }

    if (y < 0) {
      y = 0;
    } else if (y + targetRect.height > containerRect.height) {
      y = containerRect.height - targetRect.height;
    }

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    target.setAttribute('data-x', x.toString());
    target.setAttribute('data-y', y.toString());
  }

  private handleDragEnd(event: any): void {}

  private updateAnnotation(target: any, x: number, y: number): void {
    const annotationId = target.getAttribute('data-id');  
    for (let category of this.annotations) {
      for (let annotation of category.data) {
        if (annotation.id === annotationId) {
          annotation.bounding_box[0] = x;
          annotation.bounding_box[1] = y;
          break;
        }
      }
    }
  }

  private makeBoundingBoxesResizable(): void {
    interact('.bounding-box')
      .resizable({
        edges: { left: true, right: true, top: true, bottom: true },
        listeners: {
          move: this.handleResizeMove
        }
      });
  }

  private handleResizeMove(event: any): void {
    const target = event.target;
    const { width, height } = event.rect;

    target.style.width = `${width}px`;
    target.style.height = `${height}px`;

    target.setAttribute('data-x', target.getBoundingClientRect().left.toString());
    target.setAttribute('data-y', target.getBoundingClientRect().top.toString());
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
  
    // Ensure annotations are updated with explicit typing
    this.annotations = this.annotations.map(category => ({
      ...category,
      data: category.data.filter((annotation: { id: string }) => annotation.id !== annotationId)
    }));
  
    // Remove from the DOM
    target.remove();
  }
}

