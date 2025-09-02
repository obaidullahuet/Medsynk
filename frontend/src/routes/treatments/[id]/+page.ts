import { getTreatmentById } from '../../../lib/api/treatmentsApi.js';

export async function load({ params }: { params: { id: string } }) {
	const treatmentId = parseInt(params.id);
	
	try {
		const treatment = await getTreatmentById(treatmentId);
		
		if (!treatment) {
			return {
				status: 404,
				error: 'Treatment not found'
			};
		}
		
		return {
			treatment
		};
	} catch (error) {
		console.error('Error loading treatment:', error);
		return {
			status: 500,
			error: 'Failed to load treatment'
		};
	}
}
