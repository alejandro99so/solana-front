#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("3D5aNFFUUz2ED8DqJgAVecwZ1RFDUvCqkn9SnTgyy8is");

#[program]
pub mod my_first {
    use super::*;

  pub fn close(_ctx: Context<CloseMyFirst>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.my_first.count = ctx.accounts.my_first.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.my_first.count = ctx.accounts.my_first.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeMyFirst>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.my_first.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeMyFirst<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + MyFirst::INIT_SPACE,
  payer = payer
  )]
  pub my_first: Account<'info, MyFirst>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseMyFirst<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub my_first: Account<'info, MyFirst>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub my_first: Account<'info, MyFirst>,
}

#[account]
#[derive(InitSpace)]
pub struct MyFirst {
  count: u8,
}
