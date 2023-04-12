"use strict";

const postDate = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: data,
  });

  return await res.json();
};

async function getResource(url) {
  let res = await fetch(url);

  // новый мето ok, про проверки правильности обращения к серверу
  // throw new Error вывод в консоль ошибки
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }
  return await res.json();
}

export {postDate};
export {getResource};