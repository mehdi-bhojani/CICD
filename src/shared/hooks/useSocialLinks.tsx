"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { getSocialLinks } from "@/actions/get.social.links";
import { socialLinksAtom } from "@/lib/store";

const UseSocialLinks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [socialLinks, setSocialLinks] = useAtom(socialLinksAtom);

  //get user from here
  const userid  = '123';

  useEffect(() => {
    GetSocialLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userid]);

  const GetSocialLinks = async () => {
    await getSocialLinks({ userid: userid })
      .then((res: any) => {
        setData(res);
        setLoading(false);
        setSocialLinks(res);
        console.log(res);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return { data, loading };
};

export default UseSocialLinks;