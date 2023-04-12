"use strict";

const postData = async (url, data) => {
  let res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: data,
  });

  return await res.json();
};

const getData = async (url) => {
  let res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not ${url} , status: ${res.status}`);
  }

  return await res.json();
};

export { postData, getData };
