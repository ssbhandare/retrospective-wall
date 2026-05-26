import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class CardComponent {

  @Input()
  card: any;

  @Output()
  cardUpdated = new EventEmitter<void>();

  selectedCard: any = null;

  editedText = '';

  editCard() {

    this.selectedCard = this.card;

    this.editedText = this.card.text;

  }

  saveEditedCard() {

    if (!this.editedText.trim()) {
      return;
    }

    this.card.text = this.editedText;

    this.selectedCard = null;

    this.cardUpdated.emit();

  }

}