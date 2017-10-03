
import * as _ from 'lodash';
import {LESSONS} from "./database-data";


class InMemoryDatabase {

    readAllLessons() {
        return _.values(LESSONS);
    }

}




export const db = new InMemoryDatabase();


