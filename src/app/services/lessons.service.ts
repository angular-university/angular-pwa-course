
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Lesson} from "../model/lesson";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';


@Injectable()
export class LessonsService {

    constructor(private http: HttpClient) {

    }

    loadAllLessons() : Observable<Lesson[]> {
        return this.http.get<any>('/api/lessons')
          .pipe(
            map(res => res.lessons)
          )
    }

    findLessonById(id:number) {
        return this.http.get<Lesson>('/api/lessons/' + id);
    }

}

