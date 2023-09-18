import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiResponse, StandingsData } from '../../models/league';
import { FootballService } from '../../services/football.service';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css'],
})
export class LeaguesComponent implements OnInit {
  selectedLeague: string | null = null;
  leagues: StandingsData[];
  private standingsSubscription: Subscription;
  constructor(
    private footballService: FootballService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.selectedLeague = this.footballService.selectedLeague;
    if (this.selectedLeague) {
      this.getStandings(this.selectedLeague);
    }
  }

  getStandings(league: string) {
    this.selectedLeague = league;
    this.standingsSubscription = this.footballService
      .getStandings(league)
      .subscribe(
        (data: ApiResponse) => {
          if (data && data.response && data.response.length > 0) {
            this.leagues = data.response[0].league.standings[0];
          } else {
            console.error('Invalid API response format.');
          }
        },
        (error: any) => {
          console.error('Error fetching standings:', error);
        }
      );
  }
  ngOnDestroy(): void {
    // Unsubscribe from the standingsSubscription to prevent memory leaks
    if (this.standingsSubscription) {
      this.standingsSubscription.unsubscribe();
    }
  }
}
