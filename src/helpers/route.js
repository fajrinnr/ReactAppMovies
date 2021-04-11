import Router from "next/router";

export const route = (url) => {
  return Router.push(url, undefined, { shallow: true });
};

export const goBack = () => {
  return Router.back();
};