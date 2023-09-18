import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiResponse, StandingsData } from '../../models/league';
import { FootballService } from '../../services/football.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css'],
})
export class LeaguesComponent implements OnInit {
  isLoading: boolean = true; // Variable to track loading state
  selectedLeague: string | null = null;
  leagues: StandingsData[];
  private standingsSubscription: Subscription;
  constructor(
    private footballService: FootballService,
    private route: ActivatedRoute,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.loaderService.showLoader();
    this.selectedLeague = this.footballService.selectedLeague;
    if (this.selectedLeague) {
      this.getStandings(this.selectedLeague);
    }
  }

  getStandings(league: string) {
    this.loaderService.showLoader();
    this.selectedLeague = league;
    this.standingsSubscription = this.footballService
      .getStandings(league)
      .subscribe(
        (data: ApiResponse) => {
          if (data && data.response && data.response.length > 0) {
            this.leagues = data.response[0].league.standings[0];
            this.loaderService.hideLoader();
          } else {
            console.error('Invalid API response format.');
            this.loaderService.hideLoader();
          }
        },
        (error: any) => {
          console.error('Error fetching standings:', error);
          this.loaderService.hideLoader();
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
