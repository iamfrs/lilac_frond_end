"use client";
import React from "react";
import styles from "./Card.module.css";
import { useRouter } from "next/navigation";

interface CardProps {
  id:string
  country_name: string;
  country_code: string;
  capital: string;
  time_zone: string;
  current_time:string;
  // region_name: string;
  // img: string;
}

const Card: React.FC<CardProps> = ({
  id,
  country_name,
  country_code,
  capital,
  time_zone,
  current_time,
  // region_name,
  // img,
}) => {
  const router = useRouter();
  const handleCardClick = () => {
    router.push(`/region/${id}`); 
  };

  // const imageUrl = img || "/admin.png";

  return (
    <div onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <div className={styles.cardHeader}>
        {/* <img
          src={''}
          alt={"country image"}
          className={styles.cardImage}
        /> */}
        <h2>{country_name}</h2>
      </div>

      <div className={styles.cardDetails}>
        <h3>country_code</h3>
        <p>{country_code}</p>

        <h3>capital</h3>
        <p>{capital}</p>

        <h3>time_zone</h3>
        <p>{time_zone}</p>

        <h3>current_time</h3>
        <p>{current_time}</p>
      </div>
    </div>
  );
};

export default Card;
