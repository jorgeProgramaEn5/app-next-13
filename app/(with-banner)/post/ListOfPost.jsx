import Link from 'next/link';
import {LikeButton} from './LikeButton'
import { Rajdhani, Lobster } from 'next/font/google'

const lobster = Lobster({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const rajdhani  = Rajdhani ({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const fetchPost = ()=> {
    return fetch('https://jsonplaceholder.typicode.com/posts', {
        next: {
            revalidate: 60
        }
    })
      .then(res => res.json())
  }
  
  export async function ListOfPost({params}) {
    const posts = await fetchPost();
    
  
    return posts.slice(0, 10).map(post=>(
            <article key={post.id} className=" m-2 p-3 bg-primary-400 max-w-2xl ">
                <Link href={`post/${post.id}`}>
                    <h1 className={`${rajdhani.className} text-primary-100 text-xl mb-3 uppercase`}>{post.title}</h1>
                </Link>  
                <p className={`text-black mb-2 ${lobster.className}`}>{post.body}</p>
                <div className='flex justify-between pr-5'>
                    <LikeButton id={post.id} />
                    <span className="text-black">{post.id}</span>
                </div>
            </article>
        ))
    }