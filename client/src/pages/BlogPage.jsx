import React from 'react';
import BlogPost from '../components/BlogPost'; // Đường dẫn này đúng nếu BlogPost.jsx ở src/components/
import './BlogPage.css'; // Đường dẫn này đúng nếu BlogPage.css ở src/pages/
import Chatbox from '../components/Chatbox';

const blogPostsData = [
  {
    id: 1,
    title: 'Beauty life style classic',
    imageUrl: 'https://coutura.monamedia.net/wp-content/uploads/2018/02/blog5-1024x750-1-595x436.jpg',
    author: 'monamedia',
    date: '13 Tháng Hai, 2018',
    summary: 'Lorem ipsum dosectetur adipisicing elit, sed do.Lorem ipsum dolor sit amet, consectetur Nulla fringilla purus at leo dignissim congue. Mauris elementum accumsan leo vel tempor. Sit amet cursus nisl aliquam. Aliquam et elit eu nunc rhoncus viverra quis at felis.',
    link: 'https://coutura.monamedia.net/2018/02/13/beauty-life-style-classic/',
  },
  {
    id: 2,
    title: 'The need of life with vip style',
    imageUrl: 'https://coutura.monamedia.net/wp-content/uploads/2018/02/blog3-1024x750-1-595x436.jpg',
    author: 'monamedia',
    date: '13 Tháng Hai, 2018',
    summary: 'Lorem ipsum dosectetur adipisicing elit, sed do.Lorem ipsum dolor sit amet, consectetur Nulla fringilla purus at leo dignissim congue. Mauris elementum accumsan leo vel tempor. Sit amet cursus nisl aliquam. Aliquam et elit eu nunc rhoncus viverra quis at felis. Be who you are and say what you feel, because those who mind don’t matter, [...]',
    link: 'https://coutura.monamedia.net/2018/02/13/the-need-of-life-with-vip-style/',
  },
  {
    id: 3,
    title: 'There is someone standing behind you',
    imageUrl: 'https://coutura.monamedia.net/wp-content/uploads/2018/02/blog2-1024x750-1-595x436.jpg',
    author: 'monamedia',
    date: '13 Tháng Hai, 2018',
    summary: 'Lorem ipsum dosectetur adipisicing elit, sed do.Lorem ipsum dolor sit amet, consectetur Nulla fringilla purus at leo dignissim congue. Mauris elementum accumsan leo vel tempor. Sit amet cursus nisl aliquam. Aliquam et elit eu nunc rhoncus viverra quis at felis. Be who you are and say what you feel, because those who mind don’t matter, [...]',
    link: 'https://coutura.monamedia.net/2018/02/13/there-is-someone-standing-behind-you/',
  },
  {
    id: 4,
    title: 'A Beautiful and Perfect Life',
    imageUrl: 'https://coutura.monamedia.net/wp-content/uploads/2018/02/blog67-1024x750-1-595x436.jpg',
    author: 'monamedia',
    date: '27 Tháng Chín, 2017',
    summary: 'Lorem ipsum dosectetur adipisicing elit, sed do.Lorem ipsum dolor sit amet, consectetur Nulla fringilla purus at leo dignissim congue. Mauris elementum accumsan leo vel tempor. Sit amet cursus nisl aliquam. Aliquam et elit eu nunc rhoncus viverra quis at felis. Be who you are and say what you feel, because those who mind don’t matter, [...]',
    link: 'https://coutura.monamedia.net/2017/09/27/a-beautiful-and-perfect-life/',
  },
  {
    id: 5,
    title: 'On Makeup as a Power Tool',
    imageUrl: 'https://coutura.monamedia.net/wp-content/uploads/2018/02/blog8-1024x750-1-595x436.jpg',
    author: 'monamedia',
    date: '27 Tháng Chín, 2017',
    summary: 'Lorem ipsum dosectetur adipisicing elit, sed do.Lorem ipsum dolor sit amet, consectetur Nulla fringilla purus at leo dignissim congue. Mauris elementum accumsan leo vel tempor. Sit amet cursus nisl aliquam. Aliquam et elit eu nunc rhoncus viverra quis at felis. Be who you are and say what you feel, because those who mind don’t matter, [...]',
    link: 'https://coutura.monamedia.net/2017/09/27/on-makeup-as-a-power-tool/',
  },
];

const BlogPage = () => {
  return (
    <main id="main-content" className="site-main light nasa-after-clear">
      <div className="container-wrap mobile-padding-top-10 page-left-sidebar">
        <div className="div-toggle-sidebar nasa-blog-sidebar center">
          <a className="toggle-sidebar" href="#" rel="nofollow">
            <svg viewBox="0 0 32 32" width="26" height="24" fill="currentColor">
              <path d="M 4 7 L 4 9 L 28 9 L 28 7 Z M 4 15 L 4 17 L 28 17 L 28 15 Z M 4 23 L 4 25 L 28 25 L 28 23 Z"></path>
            </svg>
          </a>
        </div>

        <div className="row">
          {/* Sidebar Section */}
          <div className="large-3 medium-12 tablet-padding-right-10 desktop-padding-right-30 left columns sidebar-left">
            <div className="sidebar-inner">
              {/* Search Bar */}
              <div className="widget-item widget-search">
                <h3 className="widget-title">Tìm kiếm</h3>
                <form className="search-form">
                  <input type="search" placeholder="Tìm kiếm..." />
                  <button type="submit">
                    <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor"><path d="M 4 13 C 4 9.134 7.134 6 11 6 C 14.866 6 18 9.134 18 13 C 18 16.866 14.866 20 11 20 C 7.134 20 4 16.866 4 13 Z M 11 8 C 8.239 8 6 10.239 6 13 C 6 15.761 8.239 18 11 18 C 13.761 18 16 15.761 16 13 C 16 10.239 13.761 8 11 8 Z M 20.242 20.242 L 27.242 27.242 L 24.758 29.758 L 17.758 22.758 L 20.242 20.242 Z"></path></svg>
                  </button>
                </form>
              </div>

              {/* Categories */}
              <div className="widget-item widget-categories">
                <h3 className="widget-title">Chuyên mục</h3>
                <ul>
                  <li><a href="#">Fashions magazine</a></li>
                  <li><a href="#">Images</a></li>
                  <li><a href="#">Life style</a></li>
                  <li><a href="#">Photography</a></li>
                  <li><a href="#">Style</a></li>
                </ul>
              </div>

              {/* Latest Posts */}
              <div className="widget-item widget-latest-posts">
                <h3 className="widget-title">Bài viết mới nhất</h3>
                <ul>
                  {blogPostsData.slice(0, 5).map(post => (
                    <li key={post.id} className="nasa-widget-item-blog">
                      <a href={post.link} className="nasa-flex align-center">
                        <div className="nasa-widget-image">
                          <img src={post.imageUrl} alt={post.title} width="60" height="60" />
                        </div>
                        <div className="nasa-widget-info">
                          <h4 className="nasa-title">{post.title}</h4>
                          <span className="nasa-date">{post.date}</span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Archives */}
              <div className="widget-item widget-archives">
                <h3 className="widget-title">Archives</h3>
                <ul>
                  <li><a href="#">Tháng Hai 2018</a></li>
                  <li><a href="#">Tháng Chín 2017</a></li>
                </ul>
              </div>

              {/* Tags */}
              <div className="widget-item widget-tags">
                <h3 className="widget-title">Thẻ nổi bật</h3>
                <div className="tagcloud">
                  <a href="#">Beauty</a>
                  <a href="#">Bike</a>
                  <a href="#">blog</a>
                  <a href="#">Classic</a>
                  <a href="#">creative</a>
                  <a href="#">hot</a>
                  <a href="#">magazine</a>
                  <a href="#">new</a>
                  <a href="#">New trend</a>
                  <a href="#">post</a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Section */}
          <div id="content" className="large-9 medium-12 tablet-padding-left-10 desktop-padding-left-30 right columns">
            <div className="page-inner">
              {blogPostsData.map((post) => (
                <BlogPost
                  key={post.id}
                  title={post.title}
                  imageUrl={post.imageUrl}
                  author={post.author}
                  date={post.date}
                  summary={post.summary}
                  link={post.link}
                />
              ))}
            </div>
          </div>
        </div>
        <Chatbox onClose={() => {}} />
      </div>
    </main>
  );
};

export default BlogPage;
