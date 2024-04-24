"""empty message

Revision ID: 09535b70a605
Revises: b4f9ccfd2f2e
Create Date: 2024-04-23 19:52:59.592018

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '09535b70a605'
down_revision = 'b4f9ccfd2f2e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('_alembic_tmp_items')
    with op.batch_alter_table('items', schema=None) as batch_op:
        batch_op.alter_column('condition',
               existing_type=sa.VARCHAR(length=40),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('items', schema=None) as batch_op:
        batch_op.alter_column('condition',
               existing_type=sa.VARCHAR(length=40),
               nullable=True)

    op.create_table('_alembic_tmp_items',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('owner_id', sa.INTEGER(), nullable=False),
    sa.Column('title', sa.VARCHAR(length=40), nullable=False),
    sa.Column('brand', sa.VARCHAR(length=40), nullable=False),
    sa.Column('series', sa.VARCHAR(length=40), nullable=True),
    sa.Column('model', sa.VARCHAR(length=40), nullable=True),
    sa.Column('release_date', sa.DATE(), nullable=False),
    sa.Column('edition', sa.VARCHAR(length=40), nullable=True),
    sa.Column('condition', sa.VARCHAR(length=40), nullable=False),
    sa.Column('description', sa.VARCHAR(length=500), nullable=True),
    sa.Column('is_tradable', sa.BOOLEAN(), nullable=False),
    sa.Column('created_at', sa.DATETIME(), nullable=False),
    sa.Column('updated_at', sa.DATETIME(), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###
