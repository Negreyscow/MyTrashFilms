import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators' //specify the format

@Injectable()
export class ImdbService {
    constructor(private http: HttpService){}

    async getMovieByTitle(title: string){
        return this.http.get(`http://www.omdbapi.com/?apikey=d8f9f45&t=${title}`)
            .pipe(
                map(response => response.data)
            ).toPromise()

    }

    async getMovieByImdbId(imdbId: string){
        return this.http.get(`http://www.omdbapi.com/?apikey=d8f9f45&i=${imdbId}`)
            .pipe(
                map(response => response.data)
            ).toPromise()   
    }

    //get random film?

}
