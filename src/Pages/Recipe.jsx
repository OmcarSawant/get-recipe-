import { useEffect , useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import React from 'react'

function Recipe() {

  let params=useParams()
  const [details ,setDetails] =useState({});
  const [activeTab,setActiveTab]=useState('instructions');

  const fetchDetails=async()=>{
    const data=await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
    const detailData = await data.json();
    setDetails(detailData);
    console.log(detailData);
  }

  useEffect(()=>{
    fetchDetails();
  },)


  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>
      <Info>
        <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={()=> setActiveTab('instructions')}>Instructions</Button>
        <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={()=> setActiveTab('ingredients')}>Ingredients</Button>
        {activeTab === 'instructions' &&(
          <div>
          <h3 dangerouslySetInnerHTML={{ __html:details.summary }}></h3>
          <h3 dangerouslySetInnerHTML={{ __html:details.instructions }}></h3>
        </div>
        )};
        
        {activeTab === 'ingredients' && (
        <ul>
          {details.extendedIngredients.map((ingredient) =>(
            <li key={ingredient.id}>{ingredient.original}</li>
          ))}
        </ul>
        )};
      </Info>
    </DetailWrapper>
  )
}


const DetailWrapper = styled.div`
    margin-top:10rem;
    margin-bottom:5rem;
    display:flex;
    flex-basis:50%;
    .active{
        background:linear-gradient(35deg,#494949,#313131);
        color:white;
    }
    h2{
      margin-botton:2rem;
    }
      li{
        font-size:1.2rem;
        line-height:2.5rem;
      }
    ul{
      margin-top:2rem;
    }
`;

const Button = styled.button`
    padding:1rem 2rem;
    color:#313131;
    background:white;
    border:2px solid black;
    margin-right:2rem;
    font-weight:600;
`;

const Info=styled.div`
  margin-left:10rem;
`
export default Recipe


// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { useParams } from "react-router-dom";

// function Recipe() {
//   const { name } = useParams();
//   const [details, setDetails] = useState({});
//   const [activeTab, setActiveTab] = useState('instructions');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchDetails = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`https://api.spoonacular.com/recipes/${name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch recipe details');
//       }
//       const detailData = await response.json();
//       setDetails(detailData);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDetails();
//   }, [name]);

//   if (loading) return <LoadingMessage>Loading...</LoadingMessage>;
//   if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;

//   return (
//     <DetailWrapper>
//       <Header>
//         <h2>{details.title || 'Recipe Title'}</h2>
//         {details.image && <img src={details.image} alt={details.title || 'Recipe Image'} />}
//       </Header>
//       <Content>
//         <Info>
//           <Button
//             className={activeTab === 'instructions' ? 'active' : ''}
//             onClick={() => setActiveTab('instructions')}
//           >
//             Instructions
//           </Button>
//           <Button
//             className={activeTab === 'ingredients' ? 'active' : ''}
//             onClick={() => setActiveTab('ingredients')}
//           >
//             Ingredients
//           </Button>
//           {activeTab === 'instructions' && (
//             <div>
//               <h3 dangerouslySetInnerHTML={{ __html: details.instructions || 'No instructions available' }}></h3>
//             </div>
//           )}
//           {activeTab === 'ingredients' && (
//             <ul>
//               {details.extendedIngredients?.length > 0 ? (
//                 details.extendedIngredients.map((ingredient) => (
//                   <li key={ingredient.id}>{ingredient.original}</li>
//                 ))
//               ) : (
//                 <li>No ingredients available</li>
//               )}
//             </ul>
//           )}
//         </Info>
//       </Content>
//     </DetailWrapper>
//   );
// }

// // const DetailWrapper = styled.div`
// //   margin-top: 10rem;
// //   margin-bottom: 5rem;
// //   display: flex;
// //   flex-direction: column;
// //   align-items: center;
// // `;

// const Header = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   text-align: center;

//   img {
//     max-width: 100%;
//     border-radius: 1rem;
//   }

//   h2 {
//     margin-bottom: 1rem;
//   }
// `;

// const Content = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   width: 100%;
//   max-width: 1200px;
// `;

// // const Info = styled.div`
// //   margin-top: 2rem;
// //   text-align: center;
// //   width: 50%; /* Adjust width as needed */

// //   ul {
// //     margin-top: 2rem;
// //     padding-left: 0;
// //     list-style: none;
// //   }

// //   li {
// //     font-size: 1.2rem;
// //     line-height: 2.5rem;
// //   }
// // `;

// // const Button = styled.button`
// //   padding: 1rem 2rem;
// //   color: #313131;
// //   background: white;
// //   border: 2px solid black;
// //   margin-right: 2rem;
// //   font-weight: 600;
// //   cursor: pointer;

// //   &.active {
// //     background: linear-gradient(35deg, #494949, #313131);
// //     color: white;
// //   }
// // `;

// const LoadingMessage = styled.div`
//   text-align: center;
//   font-size: 1.5rem;
//   color: #333;
//   margin-top: 2rem;
// `;

// const ErrorMessage = styled.div`
//   text-align: center;
//   font-size: 1.5rem;
//   color: red;
//   margin-top: 2rem;
// `;
// const DetailWrapper = styled.div`
//     margin-top:10rem;
//     margin-bottom:5rem;
//     display:flex;
//     .active{
//         background:linear-gradient(35deg,#494949,#313131);
//         color:white;
//     }
//     h2{
//       margin-botton:2rem;
//     }
//       li{
//         font-size:1.2rem;
//         line-height:2.5rem;
//       }
//     ul{
//       margin-top:2rem;
//     }
// `;

// const Button = styled.button`
//     padding:1rem 2rem;
//     color:#313131;
//     background:white;
//     border:2px solid black;
//     margin-right:2rem;
//     font-weight:600;
// `;

// const Info=styled.div`
//   margin-left:10rem;
// `


// export default Recipe;
