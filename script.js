"use strict";

const result = document.getElementById("result");

const input = document.getElementById("input");
const btn = document.getElementById("search__btn");

const user = document.getElementById("user");
const username = document.getElementById("username");
const joined = document.getElementById("date");
const repos = document.getElementById("repo");
const followers = document.getElementById("follower");
const followings = document.getElementById("following");
const bio = document.getElementById("bio");
const img = document.getElementById("img");

const repo__links = document.getElementById("repo__links");

const loading = document.getElementById("loading");

let repositories = [];
let dev;

const getData = (searchValue) => {
  fetch(`https://api.github.com/users/${searchValue}`)
    .then((res) => res.json())
    .then((data) => {
      dev = data;
      console.log(dev);
      loading.style.display = dev ? "none" : "block";
      displayData();
      getRepos();
    })
    .catch((err) => {
      console.error(err.message);
      loading.style.display = "none";
    });
};
const getRepos = (searchValue) => {
  fetch(`https://api.github.com/users/${searchValue}/repos`)
    .then((res) => res.json())
    .then((data) => {
      repositories = data.slice(0, 10);
      repositories.forEach((repo) => {
        displayRepos(repo);
      });
    });
};

const displayRepos = (repo) => {
  const link = document.createElement("a");
  link.textContent = repo.name;
  link.href = repo.html_url;
  link.target = "blank";
  link.className =
    "text-white text-sm bg-blue-600 rounded-md p-2 mr-2 mb-2 inline-block";

  repo__links.append(link);
};

btn.addEventListener("click", () => {
  result.classList.replace("flex", "hidden");
  loading.style.display = "block";
  getData(input.value.trim().toLowerCase());
  getRepos(input.value.trim().toLowerCase());
  input.value = "";
});

const displayData = () => {
  result.classList.replace("hidden", "flex");
  user.textContent = dev.name ? dev.name : "No name";
  username.textContent = dev.login;
  username.href = dev.html_url;
  joined.textContent = `Joined at ${dev.created_at.slice(0, 10)}`;
  repos.textContent = dev.public_repos;
  followers.textContent = dev.followers;
  followings.textContent = dev.following;
  bio.textContent = dev.bio ? dev.bio : "No bio...";
  img.src = dev.avatar_url;
};
