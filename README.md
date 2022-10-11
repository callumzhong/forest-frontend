# 

<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="public/favicon-96x96.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">FOREST-RPG</h3>

  <p align="center">
    生活習慣養成 RPG 遊戲
    <br />
    <a href="https://forest-rpg-frontend.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/callumzhong/forest-rpg-frontend/issues">Report Bug</a>
    ·
    <a href="https://github.com/callumzhong/forest-rpg-frontend/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://forest-rpg-frontend.vercel.app/)

遊戲以釣魚、伐木、採石等，採集資源的方式培養生活習慣。

特色
* 每 5 分鐘會扣飽食度、情緒值，角色有死亡機制
* 全體聊天室讓你不孤單暢聊一整晚
* 角色動作皆有音效提升精神
* 配有外出劵、奢侈劵獎勵機制


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

主要框架與其他 Library

* [![React][React.js]][React-url]
* [![TailwindCSS][TailwindCSS.css]][TailwindCSS-url]
* [![React Hook Form][React Hook Form.js]][React Hook Form-url]
* [![React Router][React Router.js]][React Router-url]
* HTML Canvas
* mitt
* howler
* day.js


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

本地運行請參考如下

### Prerequisites

開發環境

* node v16.14.2
* yarn v1.22.19
```sh
npm install --global yarn
```

### Installation

1. 克隆儲存庫
```sh
  git clone https://github.com/callumzhong/forest-rpg-frontend.git
```
3. 安裝 npm 套件
```sh
  yarn install
```
4. 新增 .env 環境變數
```js
  # .env
  REACT_APP_API_SERVER="你的 API SERVER"
  REACT_APP_WEBSOCKET_SERVER="你的 WebSocket SERVER"
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

### 釣魚  
![image](https://i.imgur.com/tiIjUqI.gif)  
操作:  
使用 WSAD or 方向鍵移動到河邊點擊 "動作" 即可

### 採石
![image](https://i.imgur.com/bLF8uIw.gif)  
操作:  
使用 WSAD or 方向鍵移動到石頭旁點擊 "動作" 即可

### 伐木
![image](https://i.imgur.com/pV007CD.gif)    
操作:  
使用 WSAD or 方向鍵移動到樹木旁點擊 "動作" 即可



<p align="right">(<a href="#readme-top">back to top</a>)</p>





<!-- CONTACT -->
## Contact

Callum - [@Callum_Zhong](https://twitter.com/Callum_Zhong) - callum.zhong@gmail.com

Project Link: [https://github.com/callumzhong/forest-rpg-frontend](https://github.com/callumzhong/forest-rpg-frontend)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: https://www.cakeresume.com/cdn-cgi/image/fit=scale-down,format=auto,w=828/https://images.cakeresume.com/VNx1v/callum-zhong/62185fd7-a93f-41c3-a21a-31a63addb0f5.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TailwindCSS.css]: https://img.shields.io/static/v1?style=for-the-badge&message=Tailwind+CSS&color=222222&logo=Tailwind+CSS&logoColor=06B6D4&label=
[TailwindCSS-url]: https://tailwindcss.com/
[React Hook Form.js]: https://img.shields.io/static/v1?style=for-the-badge&message=React+Hook+Form&color=EC5990&logo=React+Hook+Form&logoColor=FFFFFF&label=
[React Hook Form-url]: https://www.react-hook-form.com/
[React Router.js]: https://img.shields.io/static/v1?style=for-the-badge&message=React+Router&color=CA4245&logo=React+Router&logoColor=FFFFFF&label=
[React Router-url]: https://reactrouter.com/en/main
