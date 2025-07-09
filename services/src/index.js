const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const { core } = require('./utils');
const { env, db } = require('./config');
const { root_api_router } = require('./routes');

/* CORS config and event log with morgan */
const cors_options = {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
};
const morgan_format =
  env.PLATFORM === 'dev'
    ? ':method :url :status :response-time ms'
    : ':id :method :url :status';

/* initial express app */
const app = express();

/* all important middleware */
app.use(morgan(morgan_format));
app.use(cors(cors_options));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* application endpoints and exposes /uploads folder */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', root_api_router);

/* globally errors and missing routes */
app.use((req, res, next) => core.missingRoutes(req, res, next));
app.use((error, req, res) => core.globalError(res, error));

/* connect database and server */
(async () => {
  try {
    await db.dbConnect();
    app.listen(env.PORT || 4040, () => {
      console.log(`Server successfully started on ${env.PORT}`);
    });
  } catch (err) {
    console.error('Database failed to connect.', err);
    process.exit(1);
  }
})();
