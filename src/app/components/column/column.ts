import { RetroSection } from '../../models/board.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {  
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import {
  CdkDrag,
  CdkDropList,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CardComponent } from '../card/card';
@Component({
  selector: 'app-column',
  standalone: true,
  imports: [CommonModule, FormsModule, CdkDropList, CdkDrag, CardComponent],
  templateUrl: './column.html',
  styleUrl: './column.scss',
})
export class ColumnComponent {
  @Input() section!: RetroSection;

  newCardText = '';
  showInput = false;
  @ViewChild('cardInput')
  cardInput!: ElementRef<HTMLInputElement>;

  @Output() boardUpdated = new EventEmitter<void>();
  selectedCard: any = null;
  editedText = '';

  addCard() {
    if (!this.newCardText.trim()) {
      return;
    }

    const updatedCards = [
      ...this.section.cards,
      {
        id: Date.now(),
        text: this.newCardText,
        createdAt: new Date(),
      },
    ];

    this.section.cards = updatedCards;

    this.newCardText = '';
    this.showInput = false;

    this.boardUpdated.emit();
  }
  showCardInput() {
    this.showInput = true;

    setTimeout(() => {
      this.cardInput?.nativeElement.focus();
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.boardUpdated.emit();
  }
  editCard(card: any) {
    this.selectedCard = card;
    this.editedText = card.text;
  }

  saveEditedCard() {
    if (!this.editedText.trim()) {
      return;
    }
    this.selectedCard.text = this.editedText;
    this.section.cards = [...this.section.cards];
    this.selectedCard = null;
    this.boardUpdated.emit();
  }
  deleteCard(cardId: number) {
    this.section.cards = this.section.cards.filter((card) => card.id !== cardId);
    this.boardUpdated.emit();
  }
}
