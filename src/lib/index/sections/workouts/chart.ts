import {
	CategoryScale,
	Chart,
	LinearScale,
	LineController,
	LineElement,
	PointElement,
	Tooltip
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement, Tooltip);

export { Chart };
