import WomenThumbnail from "../assets/Navbar Images/women wear thumbnail.png";
import MenThumbnail from "../assets/Navbar Images/men wear thumbnail.png";
import KidsThumbnail from "../assets/Navbar Images/kids wear thumbnail.png";
import HomeAndLiving from "../assets/Navbar Images/home & living thumbnail.png";
import HealthAndBeauty from "../assets/Navbar Images/health & beauty thumbnail.png";


export const navItems = [
          { name: "MEN",
            id: 1,
            link:'/men',
            submenu: true, 
            sublinks: [
              {
                  Head: "CLOTHING",
                  id:1,
                  sublink: [
                      { id:1, name:'DRESSES',link:'/dress' },
                      { id:2, name:'TOPS',link:'/' },
                      { id:3, name:'T-SHIRTS',link:'/' },
                      { id:4, name:'PANTS',link:'/' },
                      { id:5, name:'JUMPSUITS',link:'/' },
                      { id:6, name:'GEANS',link:'/' },
                      { id:7, name:'SKIRTS',link:'/' },
                      { id:8, name:'SHORTS',link:'/' },
                  ],
              },
              {
                  Head:"INNERWEAR",
                  id: 2,
                  sublink:[
                      { id:1, name:'BOXERS & BRIEFS',link:'/'},
                      { id:2, name:'SOCKS',link:'/'},
                      { id:3, name:'UNDERSHIRTS',link:'/'},
                  ],
              },
              {
                  Head:"ACCESSORIES",
                  id: 3,
                  sublink:[
                      { id:1, name:'WATCHES',link:'/'},
                      { id:2, name:'BELTS',link:'/'},
                      { id:3, name:'TIES',link:'/'},
                      { id:4, name:'SUNGLASSES & CAPS',link:'/'},
                      { id:5, name:'WALLETS',link:'/'},
                  ],
              },
              {
                  Head:"BAGS & SHOES",
                  id: 4,
                  sublink:[
                      { id:1, name:'FORMAL & CASUAL SHOES',link:'/'},
                      { id:2, name:'FOOTWEAR',link:'/'},
                      { id:3, name:'BAGS',link:'/'},
                  ],
              },
          ],
            image: MenThumbnail,
          }, 
  
          { name: "WOMEN",
            id: 2,
            link:'/woman',
            submenu: true, 
            sublinks: [
              {
                  Head: "CLOTHING",
                  id:1,
                  sublink: [
                      {  id:1, name:'DRESSES',link:'/' },
                      {  id:2, name:'TOPS',link:'/' },
                      {  id:3, name:'T-SHIRTS',link:'/' },
                      {  id:4, name:'PANTS',link:'/' },
                      {  id:5, name:'JUMPSUITS',link:'/' },
                      {  id:6, name:'JEANS',link:'/' },
                      {  id:7, name:'SKIRTS',link:'/' },
                      {  id:8, name:'SHORTS',link:'/' },
                      {  id:9, name:'ACTIVEWEAR',link:'/' },
                      {  id:10, name:'SAREES & LEHENGAS',link:'/' },
                      {  id:11, name:'LUNGIS',link:'/' }
                  ],
              },
              {
                  Head:"INNERWEAR",
                  id:2,
                  sublink:[
                      { id:1, name:'BOXERS & BRIEFS',link:'/'},
                      { id:2, name:'SOCKS',link:'/'},
                      { id:3, name:'UNDERSHIRTS',link:'/'},
                  ],
              },
              {
                  Head:"ACCESSORIES",
                  id: 3,
                  sublink:[
                      { id:1, name:'WATCHES',link:'/'},
                      { id:2, name:'BELTS',link:'/'},
                      { id:3, name:'TIES',link:'/'},
                      { id:4, name:'SUNGLASSES & CAPS',link:'/'},
                      { id:5, name:'WALLETS',link:'/'},
                  ],
              },
              {
                  Head:"BAGS & SHOES",
                  id: 4,
                  sublink:[
                      { id:1, name:'FORMAL & CASUAL SHOES',link:'/'},
                      { id:2, name:'FOOTWEAR',link:'/'},
                      { id:3, name:'BAGS',link:'/'},
                  ],
              },
          ],
            image: WomenThumbnail,
           },
  
          { name: "KIDS & BABY",
            id: 3,
            link:'/kids-baby',
            submenu: true, 
            sublinks: [
              {
                  Head: "CLOTHING",
                  id: 1,
                  sublink: [
                      { id:1, name:'DRESSES',link:'/' },
                      { id:2, name:'TOPS',link:'/' },
                      { id:3, name:'T-SHIRTS',link:'/' },
                      { id:4, name:'PANTS',link:'/' },
                      { id:5, name:'JUMPSUITS',link:'/' },
                      { id:6, name:'JEANS',link:'/' },
                      { id:7, name:'SKIRTS',link:'/' },
                      { id:8, name:'SHORTS',link:'/' },
                      { id:9, name:'ACTIVEWEAR',link:'/' },
                      { id:10, name:'SAREES & LEHENGAS',link:'/' },
                      { id:11, name:'LUNGIS',link:'/' }
                  ],
              },
              {
                  Head:"INNERWEAR",
                  id: 2,
                  sublink:[
                      { id:1, name:'BOXERS & BRIEFS',link:'/'},
                      { id:2, name:'SOCKS',link:'/'},
                      { id:3, name:'UNDERSHIRTS',link:'/'},
                  ],
              },
              {
                  Head:"ACCESSORIES",
                  id:3,
                  sublink:[
                      { id:1, name:'WATCHES',link:'/'},
                      { id:2, name:'BELTS',link:'/'},
                      { id:3, name:'TIES',link:'/'},
                      { id:4, name:'SUNGLASSES & CAPS',link:'/'},
                      { id:5, name:'WALLETS',link:'/'},
                  ],
              },
              {
                  Head:"BAGS & SHOES",
                  id:4,
                  sublink:[
                      { id:1, name:'FORMAL & CASUAL SHOES',link:'/'},
                      { id:2, name:'FOOTWEAR',link:'/'},
                      { id:3, name:'BAGS',link:'/'},
                  ],
              },
          ],
            image: KidsThumbnail,
        },
  
          { name: "HOME & LIVING",
            id: 3,
            link:'/home-living',
            submenu: true, 
            sublinks: [
              {
                  Head: "CLOTHING",
                  id: 1,
                  sublink: [
                      { id:1, name:'DRESSES',link:'/' },
                      { id:2, name:'TOPS',link:'/' },
                      { id:3, name:'T-SHIRTS',link:'/' },
                      { id:4, name:'PANTS',link:'/' },
                      { id:5, name:'JUMPSUITS',link:'/' },
                      { id:6, name:'JEANS',link:'/' },
                      { id:7, name:'SKIRTS',link:'/' },
                      { id:8, name:'SHORTS',link:'/' },
                      { id:9, name:'ACTIVEWEAR',link:'/' },
                      { id:10, name:'SAREES & LEHENGAS',link:'/' },
                      { id:11, name:'LUNGIS',link:'/' }
                  ],
              },
              {
                  Head:"INNERWEAR",
                  id: 2,
                  sublink:[
                      { id:1, name:'BOXERS & BRIEFS',link:'/'},
                      { id:2, name:'SOCKS',link:'/'},
                      { id:3, name:'UNDERSHIRTS',link:'/'},
                  ],
              },
              {
                  Head:"ACCESSORIES",
                  id:3,
                  sublink:[
                      { id:1, name:'WATCHES',link:'/'},
                      { id:2, name:'BELTS',link:'/'},
                      { id:3, name:'TIES',link:'/'},
                      { id:4, name:'SUNGLASSES & CAPS',link:'/'},
                      { id:5, name:'WALLETS',link:'/'},
                  ],
              },
              {
                  Head:"BAGS & SHOES",
                  id:4,
                  sublink:[
                      { id:1, name:'FORMAL & CASUAL SHOES',link:'/'},
                      { id:2, name:'FOOTWEAR',link:'/'},
                      { id:3, name:'BAGS',link:'/'},
                  ],
              },
          ],
            image: HomeAndLiving,
        }, 
          { name: "HEALTH & LIVING",
            id: 3,
            link:'/woman',
            submenu: true, 
            sublinks: [
              {
                  Head: "CLOTHING",
                  id: 1,
                  sublink: [
                      { id:1, name:'DRESSES',link:'/' },
                      { id:2, name:'TOPS',link:'/' },
                      { id:3, name:'T-SHIRTS',link:'/' },
                      { id:4, name:'PANTS',link:'/' },
                      { id:5, name:'JUMPSUITS',link:'/' },
                      { id:6, name:'JEANS',link:'/' },
                      { id:7, name:'SKIRTS',link:'/' },
                      { id:8, name:'SHORTS',link:'/' },
                      { id:9, name:'ACTIVEWEAR',link:'/' },
                      { id:10, name:'SAREES & LEHENGAS',link:'/' },
                      { id:11, name:'LUNGIS',link:'/' }
                  ],
              },
              {
                  Head:"INNERWEAR",
                  id: 2,
                  sublink:[
                      { id:1, name:'BOXERS & BRIEFS',link:'/'},
                      { id:2, name:'SOCKS',link:'/'},
                      { id:3, name:'UNDERSHIRTS',link:'/'},
                  ],
              },
              {
                  Head:"ACCESSORIES",
                  id:3,
                  sublink:[
                      { id:1, name:'WATCHES',link:'/'},
                      { id:2, name:'BELTS',link:'/'},
                      { id:3, name:'TIES',link:'/'},
                      { id:4, name:'SUNGLASSES & CAPS',link:'/'},
                      { id:5, name:'WALLETS',link:'/'},
                  ],
              },
              {
                  Head:"BAGS & SHOES",
                  id:4,
                  sublink:[
                      { id:1, name:'FORMAL & CASUAL SHOES',link:'/'},
                      { id:2, name:'FOOTWEAR',link:'/'},
                      { id:3, name:'BAGS',link:'/'},
                  ],
              },
          ],
            image: HealthAndBeauty,
        }, 
          { name: "OFFERS" }];