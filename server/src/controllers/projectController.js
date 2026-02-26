const Project = require("../models/Project");

// Create Project
exports.createProject = async (req, res) => {
  const { title, description } = req.body;

  const project = await Project.create({
    title,
    description,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    data: project,
  });
};

// Get All Projects (Only Logged In User's)
exports.getProjects = async (req, res) => {
  const projects = await Project.find({ user: req.user._id });

  res.json({
    success: true,
    count: projects.length,
    data: projects,
  });
};

// Update Project
exports.updateProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  // 🔒 Ownership Check
  if (project.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to update this project",
    });
  }

  project.title = req.body.title || project.title;
  project.description = req.body.description || project.description;

  const updatedProject = await project.save();

  res.json({
    success: true,
    data: updatedProject,
  });
};

// Delete Project
exports.deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  // 🔒 Ownership Check
  if (project.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to delete this project",
    });
  }

  await project.deleteOne();

  res.json({
    success: true,
    message: "Project deleted successfully",
  });
};

