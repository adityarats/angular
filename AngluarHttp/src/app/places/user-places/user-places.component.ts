import { Component, DestroyRef, inject, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { throwError } from 'rxjs/internal/observable/throwError';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent {
  isFetching = signal(false);
  error = signal('');

  private destroyRef = inject(DestroyRef);
  private  placesService = inject(PlacesService);
  places = this.placesService.loadedUserPlaces;



  ngOnInit() {
      this.isFetching.set(true);
      const subscription = this.placesService.loadUserPlaces().subscribe({
          error: (error: Error) => {
            console.error(error);
            this.error.set(error.message);
          },
          complete: () => {
            this.isFetching.set(false);
          }
        });

        this.destroyRef.onDestroy(() => {
          subscription.unsubscribe();
          });
    }
  
    onRemovePlace(selectedPlace: Place) {
      const subscription = this.placesService.removeUserPlace(selectedPlace).subscribe({
        next: (response) => { console.log(response);  },
        error: (error) => { console.error(error);  }
      });
  
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }