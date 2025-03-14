import { Banner } from '@prisma/client';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function PromoteBanner() {
  const [banners, setBanners] = useState<Banner[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get(
          "/api/af990241-e9fd-458c-9612-47ea908df21f/banner"
        );
        setBanners(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanner();
  }, []);
  return (
    <div>

    </div>
  )
}
