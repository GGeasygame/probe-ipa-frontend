import {Injectable} from '@angular/core';
import {TextRequestDto} from './dto/TextRequestDto';
import {HttpClient} from '@angular/common/http';
import {AnalysisRequestDto} from './dto/AnalysisRequestDto';
import {timeout} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly SERVER_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  getTexts() {
    return this.http.get(`${this.SERVER_URL}/texts`)
      .pipe(timeout(5000))
  }

  addText(text: TextRequestDto) {
    return this.http.post(`${this.SERVER_URL}/texts`, text)
      .pipe(timeout(5000))
  }

  updateText(id: number, text: TextRequestDto) {
    return this.http.put(`${this.SERVER_URL}/texts/${id}`, text)
      .pipe(timeout(5000))
  }

  analyse(analysisRequest: AnalysisRequestDto) {
    return this.http.post(`${this.SERVER_URL}/analysis`, analysisRequest)
      .pipe(timeout(5000))
  }
}
