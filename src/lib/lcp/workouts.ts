export function extractSportType(sport_type: string): [string, string] {
	const icon_folder = '/icons/activities/strava/';
	let name: string;
	let icon_name: string;
	switch (sport_type) {
		case 'Run':
			name = sport_type;
			icon_name = 'run.svg';
			break;
		case 'GravelRide':
			name = 'Gravel Ride';
			icon_name = 'gravel.svg';
			break;
		case 'Hike':
			name = sport_type;
			icon_name = 'hike.svg';
			break;
		case 'Walk':
			name = sport_type;
			icon_name = 'walk.svg';
			break;
		case 'Ride':
			name = sport_type;
			icon_name = 'ride.svg';
			break;
		case 'MountainBikeRide':
			name = 'Mountain Bike Ride';
			icon_name = 'mtb.svg';
			break;
		case 'Kayaking':
			name = sport_type;
			icon_name = 'kayak.svg';
			break;
		case 'Pickleball':
			name = sport_type;
			icon_name = 'pickle.svg';
			break;
		case 'WeightTraining':
			name = 'Weight Training';
			icon_name = 'weight-training.svg';
			break;
		default:
			name = 'Workout';
			icon_name = 'workout.svg';
	}
	return [name, icon_folder + icon_name];
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
