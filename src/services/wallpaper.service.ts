import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WallpaperService {
  private wallpaperSource = new BehaviorSubject<string>(
    'assets/wallpapers/default.jpg'
  );
  currentWallpaper = this.wallpaperSource.asObservable();

  updateWallpaper(newWallpaper: string) {
    this.wallpaperSource.next(newWallpaper);
  }
}
