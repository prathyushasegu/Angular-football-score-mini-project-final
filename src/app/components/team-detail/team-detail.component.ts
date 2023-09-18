import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Fixture, ApiResponse } from '../../models/fixture';
import { FootballService } from '../../services/football.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css'],
})
export class TeamDetailComponent implements OnInit {
  teamNumber: number;
  selectedLeague: string;
  fixtures: Fixture[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private footballService: FootballService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.teamNumber = +params['teamNumber'];
      // Fetch team details based on this.teamNumber and display them
      this.getTeamScores(this.teamNumber);
    });
  }

  getTeamScores(teamId: number) {
    this.footballService
      .getTeamScoresTop10(teamId)
      .subscribe((data: ApiResponse) => {
        // Handle the response data, which contains fixture information
        this.fixtures = data.response;
        this.selectedLeague = this.fixtures[0].league.country.toLowerCase();
      });
  }

  goToLeagueSelection(): void {
    this.router.navigate(['/teams']);
  }
}
