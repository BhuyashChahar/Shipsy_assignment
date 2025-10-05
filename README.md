# Task Management System

A modern, full-stack task management application built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

### Authentication
- Secure username/password authentication
- JWT token-based sessions
- User registration and login

### Task Management
- **CRUD Operations**: Create, read, update, and delete tasks
- **Required Fields**:
  - Text field (title)
  - Enum fields (status, priority)
  - Boolean field (completion status)
  - Calculated field (progress percentage)

### Advanced Features
- **Pagination**: 8 items per page with navigation
- **Filtering**: Filter by status, priority, and completion
- **Sorting**: Sort by date, title, priority, and progress
- **Search**: Full-text search across titles and descriptions
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Authentication**: JWT with HTTP-only cookies
- **Password Hashing**: bcryptjs

## 🏃‍♂️ Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

1. **Register**: Create a new account with username and password
2. **Login**: Sign in with your credentials
3. **Create Tasks**: Click "New Task" to add tasks with title, description, status, priority, and time estimates
4. **Manage Tasks**: Edit, delete, or mark tasks as complete
5. **Filter & Search**: Use filters and search to find specific tasks
6. **Track Progress**: Monitor progress percentage based on actual vs estimated hours

## 🎨 UI Features

- **Modern Design**: Clean, intuitive interface
- **Responsive Layout**: Works on all screen sizes
- **Loading States**: Smooth user experience with loading indicators
- **Error Handling**: Clear error messages and validation
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🔧 Development

### Project Structure
```
src/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   └── page.tsx        # Main page
├── components/         # React components
├── lib/                # Utilities and database
└── types/              # TypeScript interfaces
```

### Key Components
- `TaskManager`: Main application component
- `TaskList`: Displays tasks with pagination
- `TaskForm`: Create/edit task modal
- `TaskFilters`: Filtering interface
- `LoginForm`/`RegisterForm`: Authentication

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**:
   ```bash
   vercel
   ```

4. **Set Environment Variables** in Vercel Dashboard:
   - Go to your project settings
   - Add environment variable: `JWT_SECRET` with a strong secret key
   - Example: `JWT_SECRET=your-super-secret-jwt-key-here`

5. **Redeploy** after setting environment variables:
   ```bash
   vercel --prod
   ```

### Alternative: GitHub Integration

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set environment variables in the dashboard
   - Deploy!

### Environment Variables
- `JWT_SECRET`: Strong secret key for JWT authentication (required)
- `NEXT_PUBLIC_APP_URL`: Your app URL (optional)

## 📋 Requirements Met

✅ **Authentication System**: Username/password login  
✅ **CRUD Operations**: Complete task management  
✅ **Required Fields**: Text, enum, boolean, calculated  
✅ **Pagination**: 8 items per page  
✅ **Filtering**: Status, priority, completion filters  
✅ **Bonus Features**: Sorting and search functionality  
✅ **Modern UI**: Responsive React interface  

Built with ❤️ using AI assistance for modern development practices.