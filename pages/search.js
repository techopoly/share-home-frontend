import { format } from 'date-fns';
import { useRouter } from 'next/router';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InfoCard from '../components/InfoCard';
import MapArea from '../components/MapArea';
import MenuModal from '../components/MenuModal';
import LoginModal from '../components/LoginModal';


function Search({searchResults}) {
  const router = useRouter();

  const { location, startDate, endDate, noOfGuests } = router.query;

  const formattedStartDate = format(new Date(startDate), 'dd MMMM yy');
  const formattedEndDate = format(new Date(endDate), 'dd MMMM yy');
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div className="">
      {/* Modals */}
      <MenuModal/>
      <LoginModal/>

      <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />

      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays - {range}  for {noOfGuests} guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>

          <div className="hidden  lg:inline-flex mb-5 space-x-3  text-gray-800 whitespace-nowrap">
            {/* button is a custom component of tailwind css */}
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>
          <div className='flex  flex-col'>
            {searchResults.map((item) => {
              return (<InfoCard
              key={item._id}
              location={item.address}
              title={item.title}
              place={item.place}
              img={item.imageInfo[0].url}
              description={item.description}
              star='4.5'
              price={item.price}
              total={item.price}
              longitude={item.location.longitude}
              latitude={item.location.latitude}
              id={item._id}
              startDate={formattedStartDate}
              endDate={formattedEndDate}
              noOfGuests={noOfGuests}
              />)
            })}
          </div>
        </section>
        <section className='hidden xl:inline-flex xl:min-w-[600px]'>
          <MapArea searchResults={searchResults} />
        </section>
      </main>
      <Footer/>
    </div>
  );
}

  
export default Search;

export async function getServerSideProps() {
  // Fetch searchResults from external API
  const res = await fetch(`https://online-lodging-marketplace.herokuapp.com/searchResult`)
  const data = await res.json()
  const searchResults = data.data

  console.log(searchResults)

  // Pass searchResults to the page via props
  return { props: { searchResults } }
}