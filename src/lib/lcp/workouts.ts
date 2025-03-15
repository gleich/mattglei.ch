import Gravel from '$lib/icons/workouts/gravel.svelte';
import Hike from '$lib/icons/workouts/hike.svelte';
import Kayak from '$lib/icons/workouts/kayak.svelte';
import Mtb from '$lib/icons/workouts/mtb.svelte';
import Pickleball from '$lib/icons/workouts/pickleball.svelte';
import Ride from '$lib/icons/workouts/ride.svelte';
import Run from '$lib/icons/workouts/run.svelte';
import Walk from '$lib/icons/workouts/walk.svelte';
import WeightTraining from '$lib/icons/workouts/weight-training.svelte';
import WorkoutIcon from '$lib/icons/workouts/workout.svelte';
import type { Component } from 'svelte';

export function iconFromType(sport_type: string): Component {
	switch (sport_type) {
		case 'Run':
			return Run;
		case 'GravelRide':
			return Gravel;
		case 'Hike':
			return Hike;
		case 'Walk':
			return Walk;
		case 'Ride':
			return Ride;
		case 'MountainBikeRide':
			return Mtb;
		case 'Kayaking':
			return Kayak;
		case 'Pickleball':
			return Pickleball;
		case 'WeightTraining':
			return WeightTraining;
		default:
			return WorkoutIcon;
	}
}

export function nameFromType(sport_type: string): string {
	switch (sport_type) {
		case 'GravelRide':
			return 'Gravel Ride';
		case 'MountainBikeRide':
			return 'Mountain Bike Ride';
		case 'WeightTraining':
			return 'Weight Training';
		default:
			return sport_type;
	}
}

export interface Workout {
	platform: string;
	name: string;
	sport_type: string;
	start_date: Date;
	timezone: string;
	map_blur_image?: string;
	has_map: boolean;
	map_image_url?: string;
	total_elevation_gain: number;
	moving_time: number;
	distance: number;
	average_heartrate?: number;
	id: number;
	heartrate_data: number[];
	calories?: number;
	hevy_exercises?: HevyExercise[];
	hevy_volume_kg?: number;
	hevy_set_count?: number;
}

export interface HevyExercise {
	title: string;
	sets: HevySet[];
	exercise_template_id: string;
}

export interface HevySet {
	weight_kg: number;
	reps: number;
	type: string;
}
