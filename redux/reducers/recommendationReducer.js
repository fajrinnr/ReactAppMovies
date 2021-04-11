const initialState = {
    recommendations: [],
    movies: {
        page: 1,
        data: []
    },
    series: {
        page: 1,
        data: []
    },
    episodes: {
        page: 1,
        data: []
    }
  }
  
  const teamReducer = (state=initialState, action) => {
    switch (action.type) {
      case 'ADD_RECOMMENDATION':
      // let allFavTeam = state.favoriteTeam.concat(action.payload.teams)
        return {...state, recommendations: action.payload.recommendation}
      case 'ADD_MOVIES':
      let allMovies = {
        page: action.payload.page,
        data: state.movies.data.concat(action.payload.movies)
      }
      console.log(allMovies, "<<<<< REDUCER");
        return {...state, movies: allMovies}
      case 'ADD_SERIES':
        let allSeries = {
          page: action.payload.page,
          data: state.movies.concat(action.payload.series)
        }
      return {...state, series: allSeries}
      case 'ADD_EPISODES':
        let allEpisodes = {
          page: action.payload.page,
          data: state.movies.concat(action.payload.episodes)
        }
      return {...state, episodes: allEpisodes}
    //   case 'UNFAV':
    //     Swal.fire({
    //       position: 'center',
    //       icon: 'success',
    //       title: `Successfully remove ${action.payload.team.name} from Favorite`,
    //       showConfirmButton: false,
    //       timer: 1000
    //     })
    //     let unFavTeam = state.favoriteTeam.filter(team => {
    //       return team.team_id !== action.payload.team.team_id
    //     })
    //     return {...state, favoriteTeam: unFavTeam}
    //   case 'GET_TEAM':
    //     return {...state, allTeam: action.payload.team}
    //   case 'SORT_ASC':
    //     return {...state, allTeam: action.payload.teams}
    //   case 'SORT_DESC':
    //     return {...state, allTeam: action.payload.teams}
      default:
        return state
    }
  }
  
  export default teamReducer