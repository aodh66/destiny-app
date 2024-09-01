// import React from 'react';
import ItemCard from "./ItemCard";
import {
  // itemObjType,
  itemArrayType,
  // characterObjType,
  //   dataStateType,
} from "../CustomTypes";

type value = [string, itemArrayType];

const Bucket = (bucket: value) => {
  // console.log("🚀 ~ Bucket ~ bucket:", bucket)
  if (!bucket) {
    console.log("Bucket component has undefined data");
    return <></>;
  }

  // Object.entries(bucket).map((value) => {
  //     console.log("🚀 ~ BucketsCard ~ Object.entries(bucket).map ~ value:", value)
  //     console.log("🚀 ~ BucketsCard ~ Object.entries(bucket).map ~ value[1][0]:", value[1][0])
  // })

  return (
    <>
      {bucket &&
        bucket[1].map((item, key) => {
          return (
            <div className="item" key={item.hash + key}>
              <ItemCard {...item} />
            </div>
          );
        })}
    </>
  );
};

export default Bucket;