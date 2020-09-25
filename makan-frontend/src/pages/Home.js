import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";

import MenuCard from "../components/MenuCard";
import SuggestionsSectionContainer from "../components/SuggestionsSectionContainer";
import LoadingCenter from "../components/LoadingCenter";
import { setTabIndex } from "../actions/bottombar-actions";
import { useGet } from "../utils/rest-utils";
import { NUMBER_OF_SUGGESTIONS } from "../constants";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTabIndex(0));
  }, [dispatch]);
  const location = useSelector((store) => store.location);
  const [hasLocationName, setHasLocationName] = useState(
    !!location && !!location.name
  );
  const currUser = useSelector((store) => store.auth.user);

  const [nearbyPath, setNearbyPath] = useState(
    `/api/v1/menus/near_you?limit=${NUMBER_OF_SUGGESTIONS}&offset=0`
  );

  useEffect(() => {
    setHasLocationName(!!location && !!location.name);

    if (!!location && navigator.onLine) {
      setNearbyPath(
        `/api/v1/menus/near_you?latitude=${location.lat}&longitude=${location.lng}&limit=${NUMBER_OF_SUGGESTIONS}&offset=0`
      );
    }
  }, [location]);

  const recommended = useGet(
    `/api/v1/menus/recommended?limit=${NUMBER_OF_SUGGESTIONS}&offset=0`
  );
  const nearby = useGet(nearbyPath);
  const recent = useGet(
    `/api/v1/menus/recent?limit=${NUMBER_OF_SUGGESTIONS}&offset=0`
  );

  return (
    <>
      {recommended.isLoading || isEmpty(currUser) ? null : (
        <SuggestionsSectionContainer
          title="Recommended"
          seeMorePath="/recommended"
        >
          {recommended.data.map((obj, i) => (
            <MenuCard
              key={i}
              price={obj.price}
              count={obj.review_counts}
              rating={obj.rating}
              name={obj.name}
              link={`/menu/${obj.id}`}
              image={obj.image_url}
              tags={obj.tags}
            />
          ))}
        </SuggestionsSectionContainer>
      )}
      {nearby.isLoading ? (
        <LoadingCenter />
      ) : (
        <SuggestionsSectionContainer
          title="Near You"
          seeMorePath="/nearby"
          locationName={!hasLocationName ? undefined : location.name}
          isNearby
        >
          {nearby.data.map((obj, i) => (
            <MenuCard
              key={i}
              price={obj.price}
              rating={obj.rating}
              count={obj.review_counts}
              name={obj.name}
              link={`/menu/${obj.id}`}
              image={obj.image_url}
              tags={obj.tags}
            />
          ))}
        </SuggestionsSectionContainer>
      )}
      {recent.isLoading ? null : (
        <SuggestionsSectionContainer title="New" seeMorePath="/new">
          {recent.data.map((obj, i) => (
            <MenuCard
              key={i}
              price={obj.price}
              rating={obj.rating}
              count={obj.review_counts}
              name={obj.name}
              link={`/menu/${obj.id}`}
              image={obj.image_url}
              tags={obj.tags}
            />
          ))}
        </SuggestionsSectionContainer>
      )}
    </>
  );
}
