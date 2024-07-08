const Organisation = require('../models/organisation');
const supabase = require('../config/supabase');

const getUserOrganisations = async (req, res) => {
  try {
    const userOrganisations = await Organisation.getOrganisationsByUserId(req.user.userId);
    const orgIds = userOrganisations.data.map((uo) => uo.orgId);

    const { data: organisations } = await supabase
      .from('organisations')
      .select('*')
      .in('orgId', orgIds);

    res.status(200).json({
      status: 'success',
      message: 'Organisations retrieved successfully',
      data: { organisations },
    });
  } catch (error) {
    res.status(400).json({ message: 'Error retrieving organisations' });
  }
};

const getOrganisationById = async (req, res) => {
  try {
    const organisation = await Organisation.getOrganisationById(req.params.orgId);
    if (!organisation.data) {
      return res.status(404).json({ message: 'Organisation not found' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Organisation retrieved successfully',
      data: organisation.data,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error retrieving organisation' });
  }
};

const createOrganisation = async (req, res) => {
  const { name, description } = req.body;
  try {
    const organisation = await Organisation.createOrganisation({
      orgId: uuidv4(),
      name,
      description,
    });

    await supabase.from('user_organisations').insert({
      userId: req.user.userId,
      orgId: organisation.data.orgId,
    });

    res.status(201).json({
      status: 'success',
      message: 'Organisation created successfully',
      data: organisation.data,
    });
  } catch (error) {
    res.status(402).json({ message: 'Error creating organisation' });
  }
};

const addUserToOrganisation = async (req, res) => {
  const { userId } = req.body;
  try {
    await supabase.from('user_organisations').insert({
      userId,
      orgId: req.params.orgId,
    });

    res.status(200).json({
      status: 'success',
      message: 'User added to organisation successfully',
    });
  } catch (error) {
    res.status(400).json({ message: 'Error adding user to organisation' });
  }
};

module.exports = {
  getUserOrganisations,
  getOrganisationById,
  createOrganisation,
  addUserToOrganisation,
};
