import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { throwError } from 'rxjs/internal/observable/throwError';
import { tap } from 'rxjs/internal/operators/tap';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private errorService = inject(ErrorService);
  private httpClient = inject(HttpClient);
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces('http://localhost:3000/places', 
      'Fetching places failed, please try again later.');

  }

  loadUserPlaces() {
    return this.fetchPlaces('http://localhost:3000/user-places', 
      'Fetching user places failed, please try again later.')
      .pipe(
        tap({ next: (userPlaces) => this.userPlaces.set(userPlaces) })
      );
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();

    if (prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set([...prevPlaces, place]);
    }

    return  this.httpClient.put(`http://localhost:3000/user-places/`, {
      placeId: place.id
    }).pipe(
      catchError((error) =>  {   
        console.error(error);
        this.userPlaces.set(prevPlaces);
        this.errorService.showError('Adding place to user places failed, please try again later.');
        return throwError(() => 
          new Error('Adding place to user places failed, please try again later.')
        );
      })
    );
  }

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();
    if (prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set(prevPlaces.filter((p) => p.id !== place.id));
    }
    return  this.httpClient.delete(`http://localhost:3000/user-places/` + place.id)
    .pipe(
      catchError((error) =>  {   
        console.error(error);
        this.userPlaces.set(prevPlaces);
        this.errorService.showError('Removing place from user places failed, please try again later.');
        return throwError(() => 
          new Error('Removing place from user places failed, please try again later.')
        );
      })
    );
  }
  

  private  fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient
        .get<{places: Place[]}>(url).pipe(
          map(resData => resData.places),
          catchError((error) =>  {   
            console.error(error);
             return throwError(() => {
               new Error(errorMessage);
             });
          })
        )
} 
}