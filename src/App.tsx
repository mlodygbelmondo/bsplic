// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { Navbar, Homepage, Livepage, Footbar } from './components'
// import { useState } from 'react'
// import './scss/index.scss'
// import Promotionpage from './components/Homepage/Promotions/Promotionpage'

// type CurrentPage = 'home' | 'live' | 'promo'

// function App() {
//     const [currentPage, setCurrentPage] = useState<CurrentPage>('home')
//     const [isCouponOpen, setIsCouponOpen] = useState(false)

//     return (
//         <BrowserRouter>
//             <div className='app'>
//                 <Navbar currentPage={currentPage} />
//                 <Routes>
//                     <Route
//                         path='/bsplic/'
//                         element={
//                             <Homepage
//                                 setCurrentPage={setCurrentPage}
//                                 setIsCouponOpen={setIsCouponOpen}
//                                 isCouponOpen={isCouponOpen}
//                             />
//                         }
//                     />
//                     <Route
//                         path='/bsplic/live/'
//                         element={<Livepage setCurrentPage={setCurrentPage} />}
//                     />
//                     <Route
//                         path='/bsplic/promotion/'
//                         element={
//                             <Promotionpage setCurrentPage={setCurrentPage} />
//                         }
//                     />
//                 </Routes>
//                 <Footbar
//                     setIsCouponOpen={setIsCouponOpen}
//                     isCouponOpen={isCouponOpen}
//                 />
//             </div>
//         </BrowserRouter>
//     )
// }

// export default App
