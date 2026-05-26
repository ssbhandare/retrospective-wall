import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ColumnComponent } from '../column/column';
import { RetroSection } from '../../models/board.model';
import { BoardService } from '../../services/board.service';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, ColumnComponent, CdkDropListGroup,FormsModule],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class BoardComponent implements OnInit {
  sections: RetroSection[] = [];
  selectedSection = 'all';

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    const savedBoard = this.boardService.getBoard();

    if (savedBoard?.length) {
      // this.sections = savedBoard;
      this.sections = [...savedBoard];
    } else {
      this.sections = [
        {
          id: 'went-well',
          title: 'What went well',
          cards: [],
        },
        {
          id: 'improved',
          title: 'What can be improved',
          cards: [],
        },
        {
          id: 'start-doing',
          title: 'Start doing',
          cards: [],
        },
        {
          id: 'action-items',
          title: 'Action items',
          cards: [],
        },
      ];

      this.saveBoard();
    }
  }

  saveBoard() {
    this.boardService.saveBoard(this.sections);
  }

  get filteredSections() {
    if (this.selectedSection === 'all') {
      return this.sections;
    }

    return this.sections.filter((section) => section.id === this.selectedSection);
  }


}
