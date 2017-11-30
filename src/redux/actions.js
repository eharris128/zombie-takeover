export const UPDATE_QUERY_TYPE = 'UPDATE_QUERY_TYPE';
export const updateQueryType = queryType => ({type: UPDATE_QUERY_TYPE, queryType});

export const UPDATE_PERSON_ARRAY = 'UPDATE_PERSON_ARRAY';
export const updatePersonArray = personArray => ({type: UPDATE_PERSON_ARRAY, personArray});

export const INITIALIZE_PERSON_ARRAY = 'INITIALIZE_PERSON_ARRAY'
export const initializePersonArray = zombieArray => ({type: INITIALIZE_PERSON_ARRAY, zombieArray});