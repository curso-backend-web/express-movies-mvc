// import movies from '../data/movies.js';
import connection from '../mysql/dbManager.js';

class MoviesModel{
    async getMovies(){
        try {
            const result = await connection.query(
                `select * from movie`
            )
            
            return result;
        } catch (error) {
            
        }
        // return movies;        
    }
    getMovieById(id){
        // return movies.find(element => element.id ==id);
    }
    removeMovie(id){
        // const index = movies.findIndex(element => element.id ==id);
        // movies.splice(index,1);
        // return;
    }
}

export default new MoviesModel()