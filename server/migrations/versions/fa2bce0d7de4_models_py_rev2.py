"""models.py rev2

Revision ID: fa2bce0d7de4
Revises: 1128175c9f6f
Create Date: 2023-12-15 20:57:38.377547

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fa2bce0d7de4'
down_revision = '1128175c9f6f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('ingredients', schema=None) as batch_op:
        batch_op.add_column(sa.Column('text', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('food', sa.String(), nullable=True))
        batch_op.drop_column('name')

    with op.batch_alter_table('recipes', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('tags', sa.ARRAY(sa.String()), nullable=True))
        batch_op.add_column(sa.Column('cuisine', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('meal_type', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('dish_type', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('time', sa.Integer(), nullable=True))
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(),
               nullable=False)

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_constraint('uq_users_id', type_='unique')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.create_unique_constraint('uq_users_id', ['id'])

    with op.batch_alter_table('recipes', schema=None) as batch_op:
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.drop_column('time')
        batch_op.drop_column('dish_type')
        batch_op.drop_column('meal_type')
        batch_op.drop_column('cuisine')
        batch_op.drop_column('tags')
        batch_op.drop_column('image')

    with op.batch_alter_table('ingredients', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.VARCHAR(), autoincrement=False, nullable=True))
        batch_op.drop_column('food')
        batch_op.drop_column('text')

    # ### end Alembic commands ###
