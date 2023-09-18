import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse as fixtureResponse } from '../models/fixture';
import { ApiResponse as leagueResponse } from '../models/league';

@Injectable({
  providedIn: 'root',
})
export class FootballService {
  private API = 'https://v3.football.api-sports.io';
  private readonly currentYear: number = new Date().getFullYear(); // Get the current year

  private readonly leagueId = {
    england: 39,
    spain: 140,
    germany: 78,
    itlay: 135,
    france: 61,
  };

  selectedLeague: string;

  constructor(private http: HttpClient) {}

  getStandings(
    league: string,
    season: string = this.currentYear.toString()
  ): Observable<leagueResponse> {
    this.selectedLeague = league;

    return this.http
      .get<leagueResponse>(
        `${this.API}/standings?league=${this.leagueId[league]}&season=${season}`
      )
      .pipe(
        map((response: leagueResponse) => {
          return response;
        })
      );
  }

  /*********Get team data************ */

  getTeamScoresTop10(
    teamId: number,
    season: string = this.currentYear.toString()
  ): Observable<fixtureResponse> {
    return this.http
      .get(`${this.API}/fixtures?team=${teamId}&season=${season}&last=10`)
      .pipe(
        map((response: fixtureResponse) => {
          return response;
        })
      );
  }
}
