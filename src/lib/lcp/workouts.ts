import GravelIcon from '$lib/icons/workouts/gravel-icon.svelte';
import HikeIcon from '$lib/icons/workouts/hike-icon.svelte';
import KayakIcon from '$lib/icons/workouts/kayak-icon.svelte';
import MtbIcon from '$lib/icons/workouts/mtb-icon.svelte';
import PickleballIcon from '$lib/icons/workouts/pickleball-icon.svelte';
import RideIcon from '$lib/icons/workouts/ride-icon.svelte';
import RunIcon from '$lib/icons/workouts/run-icon.svelte';
import WalkIcon from '$lib/icons/workouts/walk-icon.svelte';
import WeightTrainingIcon from '$lib/icons/workouts/weight-training-icon.svelte';
import WorkoutIconIcon from '$lib/icons/workouts/workout-icon.svelte';
import type { Component } from 'svelte';

export function iconFromType(sport_type: string): Component {
	switch (sport_type) {
		case 'Run':
			return RunIcon;
		case 'GravelRide':
			return GravelIcon;
		case 'Hike':
			return HikeIcon;
		case 'Walk':
			return WalkIcon;
		case 'Ride':
			return RideIcon;
		case 'MountainBikeRide':
			return MtbIcon;
		case 'Kayaking':
			return KayakIcon;
		case 'Pickleball':
			return PickleballIcon;
		case 'WeightTraining':
			return WeightTrainingIcon;
		default:
			return WorkoutIconIcon;
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
	superset_id?: number;
}

export interface HevySet {
	weight_kg: number;
	reps: number;
	type: string;
	duration_seconds?: number;
}
