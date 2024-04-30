import { createBrowserRouter } from "react-router-dom";
import ArticleDetailsPage from "../pages/Articles/ArticleDetails";
import AuthorBasedArticle from "../pages/Articles/AuthorBasedArticles";
import SingleGenreContentPage from "../pages/Articles/GenreBasedArticlesPage";
import MoviesPage from "../pages/Articles/Movies";
import SingleTagContentPage from "../pages/Articles/TagBasedArticlesPage";
import Top50ArticlesPage from "../pages/Articles/Top10Articles";
import UpcomingArticlesPage from "../pages/Articles/Upcoming";
import WebSeriesPage from "../pages/Articles/WebSeries";
import LoginPage from "../pages/Auth/Login";
import RegistrationPage from "../pages/Auth/Registration";
import AddNewBlogPage from "../pages/Dashboard/AddNewBlog";
import AllBlogsPage from "../pages/Dashboard/Allblogs";
import CategoriesPage from "../pages/Dashboard/Categories";
import BlogEditPage from "../pages/Dashboard/EditBlog";
import GenresPage from "../pages/Dashboard/Genres";
import TagsPage from "../pages/Dashboard/Tags";
import Home from "../pages/HomePage";
import PrivateRoute from "./privateRoutes";

const routes = createBrowserRouter([
  {
    path: "/",
    // element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/articles/movies",
    element: <MoviesPage />,
  },
  {
    path: "/articles/web-series",
    element: <WebSeriesPage />,
  },
  {
    path: "/articles/upcoming-articles",
    element: <UpcomingArticlesPage />,
  },
  {
    path: "/articles/article-details/:id",
    element: <ArticleDetailsPage />,
  },
  {
    path: "/articles/genres/:id",
    element: <SingleGenreContentPage />,
  },
  {
    path: "/articles/tag/:id",
    element: <SingleTagContentPage />,
  },
  {
    path: "/articles/author/:id",
    element: <AuthorBasedArticle />,
  },
  {
    path: "/articles/top-10-articles",
    element: <Top50ArticlesPage />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/registration",
    element: <RegistrationPage />,
  },
  {
    path: "/dashboard",
    children: [
      {
        path: "/dashboard/add-new-blog",
        element: <PrivateRoute>
          <AddNewBlogPage />
        </PrivateRoute>,
      },
      {
        path: "/dashboard/all-blogs",
        element: <PrivateRoute>
          <AllBlogsPage />
        </PrivateRoute>,
      },
      {
        path: "/dashboard/categories",
        element: <PrivateRoute>
          <CategoriesPage />
        </PrivateRoute>,
      },

      {
        path: "/dashboard/genres",
        element: <PrivateRoute>
          <GenresPage />
        </PrivateRoute>,
      },
      {
        path: "/dashboard/tags",
        element: <PrivateRoute>
          <TagsPage />
        </PrivateRoute>,
      },
      {
        path: "/dashboard/edit-blog/:id",
        element: <PrivateRoute>
          <BlogEditPage />
        </PrivateRoute>,
      },
    ],
  },
]);

export default routes;
