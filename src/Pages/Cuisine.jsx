import React, { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'
// import { Link } from 'react-router-dom'
import { Link, useParams } from 'react-router-dom'
 

const Cuisine = () => {

    const[cuisine,setCuisine]=useState([]);
    let params = useParams();

    // const getCuisine =async (name) => {
    //     const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`)
    //     const recipes = await data.json();
    //     setCuisine(recipes.results);
    // };
    const getCuisine = async (name) => {
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=9&cuisine=${name}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const recipes = await response.json();
            console.log('API Response:', recipes); // Log the response to check its structure
            setCuisine(recipes.results || []); // Default to an empty array if results is undefined
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    useEffect(()=>{
        getCuisine(params.type);
        console.log(params.type)
    },[params.type]);
  
  
//     return (
//     <Grid>
//         {cuisine.map((item)=>{
//             return (
//                 <Card key={item.id}>
//                     <img src={item.image} alt={item.title}/>
//                     <h4>{item.title}</h4>
//                 </Card>
//             )
//         })}
//     </Grid>
//   )
return (
    <Grid 
        animate={{opacity:1}}
        initial={{opacity:0}}
        exit={{opacity:0}}
        transition={{ duration:0.5 }}
    >
        {cuisine.length > 0 ? (
            cuisine.map((item) => (
                <Card key={item.id}>
                    <Link to={'/recipe/'+ item.id}>
                    <img src={item.image} alt={item.title} />
                    <h4>{item.title}</h4>
                    </Link>
                </Card>
            ))
        ) : (
            <p>No recipes found.</p> // Display a message if no recipes are available
        )}
    </Grid>
);

}

const Grid= styled(motion.div)`
        display:grid;
        grid-template-columns:repeat(auto-fit, minmax(20rem, 1fr));
        grid-gap:3rem;
`;
const Card=styled.div`
        img{
            width:100%;
            border-radius:2rem;
        }
        a{
            text-decoration:none;
        }
        h4{
            text-align:center;
            padding:1rem;
        }
`;

export default Cuisine




















// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { useParams } from 'react-router-dom';

// const Cuisine = () => {
//     const [cuisine, setCuisine] = useState([]);
//     const { type } = useParams();  // Destructure 'type' from useParams

//     const getCuisine = async (name) => {
//         try {
//             const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`);
//             if (!data.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const recipes = await data.json();
//             setCuisine(recipes.results);
//         } catch (error) {
//             console.error('There was a problem with the fetch operation:', error);
//         }
//     };

//     useEffect(() => {
//         if (type) { // Ensure 'type' is valid before fetching
//             getCuisine(type);
//         }
//     }, [type]);

//     return (
//         <Grid>
//             {cuisine.map((item) => (
//                 <Card key={item.id}>
//                     <img src={item.image} alt={item.title} />
//                     <h4>{item.title}</h4>
//                 </Card>
//             ))}
//         </Grid>
//     );
// };

// const Grid = styled.div`
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
//     grid-gap: 3rem;
// `;

// const Card = styled.div`
//     img {
//         width: 100%;
//         border-radius: 2rem;
//     }
//     h4 {
//         text-align: center;
//         padding: 1rem;
//     }
// `;

// export default Cuisine;
