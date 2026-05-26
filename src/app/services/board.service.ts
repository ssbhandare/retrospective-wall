import { Injectable } from '@angular/core';
import { RetroSection } from '../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {

  private storageKey = 'retroBoard';

  saveBoard(sections: RetroSection[]) {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(sections)
    );
  }

  getBoard(): RetroSection[] | null {
    const boardData = localStorage.getItem(this.storageKey);
    return boardData ? JSON.parse(boardData) : null;
  }

}