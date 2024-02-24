import Head from 'next/head'
import Container from '../components/container'
import Reprints from '../components/reprints'
import HeroPost from '../components/hero-post'
import Navbar from '../components/navbar'
import Layout from '../components/layout'
import { getAllPostsForHome } from '../lib/api'
import {postsByCategories} from "../lib/filter-utils";
import {CURRENT_ISSUE_MARKER, ISSUE_ONE_MARKER, ISSUE_TWO_MARKER, REPRINT_MARKER} from "../lib/constants";
import MoreStories from '../components/more-stories';
import NavbarTranslate from '../components/navbar-translate';
import NavbarArchive from '../components/navbar-archive';

export default function Archive({ allPosts: { edges }, preview }) {
  // const currentIssuePosts = postsByCategories(edges, [CURRENT_ISSUE_MARKER]);
  // const heroPost = currentIssuePosts[0]?.node;
  const reprintPosts = postsByCategories(edges, [REPRINT_MARKER]);
  const issueOnePosts = postsByCategories(edges, [ISSUE_ONE_MARKER]);
  const issueTwoPosts = postsByCategories(edges, [ISSUE_TWO_MARKER]);
  const issueThreePosts = postsByCategories(edges, [CURRENT_ISSUE_MARKER]);
  const route = 'posts'

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>London Ukrainian Review</title>
          <meta
            property="og:image"
            // content={post.featuredImage?.node?.sourceUrl}
            // content={heroPost.featuredImage?.node?.sourceUrl}
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@londonukrainianreview" />
          <meta name="twitter:creator" content="@londonukrainianreview" />
          <meta property="og:title" content="London Ukrainian Review" />
          <meta property="og:description" content="The London Ukrainian Review is an open-access journal that tackles global challenges through the prism of Ukraine while adopting a distinctly internationalist perspective on the Ukrainian past and present." />
        </Head>
        <div className="mb-4">
          <Navbar route={route} slug={'archive'}/>
          <div className="mt-2 mb-4">
            <NavbarArchive route={route}/>
          </div>
        </div>
        <Container>
          <div className="mb-6">
            {issueTwoPosts.length > 0 &&
              <MoreStories posts={issueThreePosts}
                           heading={'Special Issue 3 (2023)'}/>}
          </div>
          <div className="mb-6">
            {issueTwoPosts.length > 0 &&
              <MoreStories posts={issueTwoPosts}
                           heading={'Special Issue 2 (2022)'}/>}
          </div>
          <div className="mb-6">
            {issueOnePosts.length > 0 &&
              <MoreStories posts={issueOnePosts}
                           heading={'Special Issue 1 (2021)'}/>}
          </div>
          <div className="">
            {reprintPosts.length > 0 && <Reprints posts={reprintPosts}/>}
          </div>

        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({preview = false}) {
  const allPosts = await getAllPostsForHome(preview);
  return {
    props: {allPosts, preview },
  }
}
