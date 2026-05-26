import { Injectable } from '@angular/core';
import { RetroSection } from '../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {

  private STORAGE_KEY = 'retro-board';

  saveBoard(sections: RetroSection[]) {
    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(sections)
    );
  }

  getBoard(): RetroSection[] | null {

    const data = localStorage.getItem(this.STORAGE_KEY);

    return data ? JSON.parse(data) : null;
  }

}