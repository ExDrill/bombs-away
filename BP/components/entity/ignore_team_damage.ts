
const compSchema = {
    $schema: 'http://json-schema.org/draft-07/schema',
    type: 'object',
    additionalProperties: false
}

function generateData(): object {
	const data = {}
	const triggers = []

	for (let i = 0; i <= 15; i++) {
		const trigger = {}

		trigger['on_damage'] = {
			filters: {
				any_of: [
					{
						test: 'int_property',
						domain: 'bombs_away:team',
						value: i
					},
					{
						test: 'int_property',
						domain: 'bombs_away:team',
						subject: 'other',
						value: i
					}
				]
			}
		}
		trigger['deals_damage'] = 'no'

		triggers.push(trigger)
	}

	data['minecraft:damage_sensor'] = {
		triggers
	}

	return data
}

export default defineComponent(({ name, template, schema }) => {
	name('bombs_away:ignore_team_damage')
	schema(compSchema)

	template((args, context) => {
		context.create(generateData(), 'minecraft:entity/components')
	})
})
