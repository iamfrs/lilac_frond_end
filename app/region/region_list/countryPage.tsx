import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './countryPage.module.css'; 

const CountryPage = () => {
  const router = useRouter();
  const { id } = router.query;  
  const [countryData, setCountryData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchCountryData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:5000/country/view/${id}`);
          if (response.data.success) {
            setCountryData(response.data.data);
            setError(null);
          } else {
            setError('Failed to load country data');
          }
        } catch (err) {
          setError('Error fetching country data');
        } finally {
          setLoading(false);
        }
      };

      fetchCountryData();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <h1>{countryData?.name}</h1>  
      <div className={styles.countryDetails}>
        <div className={styles.row}>
          <span className={styles.label}>Name:</span>
          <span>{countryData?.name}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Capital:</span>
          <span>{countryData?.capital}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Region:</span>
          <span>{countryData?.region}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Population:</span>
          <span>{countryData?.population}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Flag:</span>
          {countryData?.flag && <img src={countryData.flag} alt="Flag" className={styles.flagImage} />}
        </div>
      </div>
    </div>
  );
};

export default CountryPage;
